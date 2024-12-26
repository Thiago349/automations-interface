import BaseNode from "./BaseNode";
import LockIcon from '@mui/icons-material/Lock'

const AuthNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
            icon={
                <LockIcon 
                    sx={{
                        fontSize: '20px'
                    }}
                />
            }
        />
    )
};

export default AuthNode;