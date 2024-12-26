import BaseNode from "./BaseNode";
import ReplyIcon from '@mui/icons-material/Reply'

const ResponseNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <ReplyIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default ResponseNode;