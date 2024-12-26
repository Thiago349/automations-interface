import BaseNode from "./BaseNode";
import CallSplitIcon from '@mui/icons-material/CallSplit'

const BranchNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <CallSplitIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default BranchNode;