interface cascaderItem {
    value: string,
    label: string,
    children?: cascaderItem[]
}
interface cascaderData {
    items?: cascaderItem[],
}

type cascader = cascaderData & configuration & styling
