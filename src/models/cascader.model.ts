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

interface cascaderConfiguration {
    configuration?: {
        sort?: string,
        expandTrigger?: 'click' | 'hover',
        defaultValue?: string[],
        separator?: string,
        autofocus?: boolean,
        placeholder?: string,
        name?: string,
        readonly?: boolean,
        disabled?: boolean,
        changeOnSelect?: boolean
    }
}
interface cascaderStyling {
    styling?: {
        colorScheme: string
    }
}


type cascaderCallback  = (result: string) => void;
type cascader = cascaderData & cascaderConfiguration & cascaderStyling

