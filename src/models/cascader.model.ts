interface cascaderItem {
    value: string,
    label: string,
    children?: cascaderItem[],
    disabled?: boolean
}
interface cascaderData {
    data: {
        items?: cascaderItem[],
    }
}

type cascader = cascaderData & configuration & styling
