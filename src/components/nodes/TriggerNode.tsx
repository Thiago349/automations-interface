import BaseNode from "./BaseNode"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

const TriggerNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <PlayArrowIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
}

export default TriggerNode