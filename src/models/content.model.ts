interface styling {
    styling?: {
        colorScheme: string
    }
}

interface configuration {
    configuration?: {
        sort?: string,
        expandTrigger?: 'click' | 'hover',
        defaultValue?: string[],
        separator?: string,
        autofocus?: boolean,
        placeholder?: string,
        name?: string,
        readonly?: boolean,
        disabled?: boolean
    }
}

type cascaderCallback  = (result: string) => void;
