import BaseNode from "./BaseNode";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <ErrorOutlineIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default ErrorNode