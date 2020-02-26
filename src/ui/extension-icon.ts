import TabIconDetails = chrome.browserAction.TabIconDetails;

export const
    STATE_ACTIVE = 'active',
    STATE_INACTIVE = 'inactive',
    STATE_DEFAULT = 'default';

export class ExtensionIcon {
    /**
     * Set icon based on state.
     */
    static setState(state: string, tabId: number | null) {
        /**
         * @type {chrome.browserAction.TabIconDetails}
         */
        let details: TabIconDetails = {
            /**
             * Relative image path or a dictionary {size -> relative image path} pointing to icon to be set.
             */
            path: undefined,

            /**
             * Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.
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
