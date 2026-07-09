function clearCache () {
    const keysToRemove = [
        'CURRENT_TYPE'
    ];

    CACHE.removeAll(keysToRemove);
}