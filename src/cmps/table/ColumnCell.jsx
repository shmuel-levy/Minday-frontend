import { TextColumn } from './column-types/columns/TextColumn'
import { StatusColumn } from './column-types/columns/StatusColumn'
import { PersonColumn } from './column-types/columns/PersonColumn'
import { DateColumn } from './column-types/columns/DateColumn'

export function ColumnCell({ column, value, onUpdate }) {
    const cellProps = {
        column,
        value,
        onUpdate,
        style: { width: column.width }
    }

    switch (column.type) {
        case 'text':
            return <TextColumn {...cellProps} />
        case 'status':
            return <StatusColumn {...cellProps} />
        case 'person':
            return <PersonColumn {...cellProps} />
        case 'date':
            return <DateColumn {...cellProps} />
        default:
            return <TextColumn {...cellProps} />
    }
}