import BaseNode from "./BaseNode";
import LoopIcon from '@mui/icons-material/Loop'

const LoopNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <LoopIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default LoopNode;