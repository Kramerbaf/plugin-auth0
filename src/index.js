import createAuth0Client from '@auth0/auth0-spa-js';
/* wwEditor:start */
import './components/MachineToMachine/SettingsEdit.vue';
import './components/MachineToMachine/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
import './components/SinglePageApp/SettingsEdit.vue';
import './components/SinglePageApp/SettingsSummary.vue';
import { GET_AUTH0_ROLES } from './graphql';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {
        await this.createClient();
        await this.checkRedirectCallback();
        await this.checkIsAuthenticated();
    },
    async createClient() {
        const { domain, SPAClientId: client_id, afterSignInPageId } = this.settings.publicData;

        const page = wwLib.wwWebsiteData.getPages().find(page => page.id === afterSignInPageId);
        const redirect_uri = page
            ? `${window.location.origin}/${page.paths[wwLib.wwLang.lang] || page.paths.default}`
            : window.location.origin;

        this.client = await createAuth0Client({ domain, client_id, redirect_uri });
    },
    async checkRedirectCallback() {
        try {
            const { code, state } = wwLib.manager
                ? wwLib.getManagerRouter().currentRoute.query
                : wwLib.getFrontRouter().currentRoute.query;
            if (code && state) {
                const { appState } = await this.client.handleRedirectCallback();
                this.onRedirectCallback(appState);
            }
        } catch (err) {
            this.error = err;
            wwLib.wwLog.error(err);
        }
    },
    async checkIsAuthenticated() {
        this.isAuthenticated = await this.client.isAuthenticated();
        this.user = await this.client.getUser();
        this.loading = false;
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    async getRoles(isNoCache = false) {
        const { data } = await wwLib.$apollo.query({
            query: GET_AUTH0_ROLES,
            variables: {
                designId: this.settings.designId,
                settingsId: this.settings.id,
            },
            fetchPolicy: isNoCache ? 'network-only' : 'cache-first',
        });
        return data.getAuth0Roles.data.map(role => ({ label: role.description, value: role.id }));
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Auth0 API
    \================================================================================================*/
    client: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    popupOpen: false,
    /** Authenticates the user using a popup window */
    async loginWithPopup(options, config) {
        this.popupOpen = true;
        try {
            await this.client.loginWithPopup(options, config);
        } catch (err) {
            wwLib.wwLog.error(err);
        } finally {
            this.popupOpen = false;
            this.user = await this.client.getUser();
            this.isAuthenticated = await this.client.isAuthenticated();
        }
    },
    /** Handles the callback when logging in using a redirect */
    async handleRedirectCallback() {
        this.loading = true;
        try {
            await this.client.handleRedirectCallback();
        } catch (err) {
            wwLib.wwLog.error(err);
        } finally {
            this.user = await this.client.getUser();
            this.isAuthenticated = true;
            this.loading = false;
        }
    },
    /** Authenticates the user using the redirect method */
    loginWithRedirect(o) {
        return this.client.loginWithRedirect(o);
    },
    /** Returns all the claims present in the ID token */
    getIdTokenClaims(o) {
        return this.client.getIdTokenClaims(o);
    },
    /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
    getTokenSilently(o) {
        return this.client.getTokenSilently(o);
    },
    /** Gets the access token using a popup window */
    getTokenWithPopup(o) {
        return this.client.getTokenWithPopup(o);
    },
    /** Logs the user out and removes their session on the authorization server */
    logout(o) {
        return this.client.logout(o);
    },
};
