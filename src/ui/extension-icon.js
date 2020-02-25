export const
    STATE_ACTIVE = 'active',
    STATE_INACTIVE = 'inactive',
    STATE_DEFAULT = 'default';

export class ExtensionIcon {
    /**
     * Set icon based on state.
     *
     * @param {string} state
     * @param {number|null} tabId
     */
    static setState(state, tabId) {
        /**
         * @type {chrome.browserAction.TabIconDetails}
         */
        let details = {
            /**
             * Relative image path or a dictionary {size -> relative image path} pointing to icon to be set.
             *
             * @type {string|null}
             */
            path: undefined,

            /**
             * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
             *
             * @type {number|null}
             */
            tabId: undefined,
        };

        switch (state) {
            case STATE_ACTIVE:
                details.path = '/img/icons/48x48.png';
                break;

            case STATE_INACTIVE:
                details.path = '/img/icons/48x48g.png';
                break;

            default: // STATE_DEFAULT
                details.path = '/img/icons/48x48t.png';
                break;
        }

        if (typeof tabId === 'number') {
            details.tabId = tabId;
        }

        chrome.browserAction.setIcon(details);
    }
}
