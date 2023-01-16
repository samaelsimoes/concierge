export interface CollectionProductModel {
    id: string,
    title: string,
    formatSize: string,
    sku: string,
    edge: string,
    finish: string,
    image: string,
    certificate?: string,
    qtde?: number,
    unit_measure?: string,
    catalog: boolean,
}