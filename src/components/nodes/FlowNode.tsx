import BaseNode from "./BaseNode";
import AirOutlinedIcon from '@mui/icons-material/AirOutlined'

const FlowNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <AirOutlinedIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default FlowNode