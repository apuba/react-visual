
export const getStaticDataSource = store => store && store.dataSource ? store.dataSource.static : {} // 获取页面的静态数据源
export const getDynimcDataSource = store => store && store.dataSource ? store.dataSource.dynamic : {} // 获取页面的动态数据源(主要是后端数据库的数据源)
