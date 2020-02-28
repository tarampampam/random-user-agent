declare namespace Services {
  export interface Storage {
    /**
     * Removes all items from storage.
     */
    clear(): Promise<void>;

    /**
     * Save object in storage.
     */
    set(key: string, value: { [key: string]: any }): Promise<void>;

    /**
     * Get object from storage.
     */
    get(key: string): Promise<{ [key: string]: any }>;
  }
}
