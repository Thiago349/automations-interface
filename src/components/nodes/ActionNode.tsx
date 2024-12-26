import BaseNode from "./BaseNode";
import BoltIcon from '@mui/icons-material/Bolt'

const ActionNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <BoltIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default ActionNode