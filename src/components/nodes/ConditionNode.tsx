import BaseNode from "./BaseNode";

const ConditionalNode = ({ data }: { data: { label: string } }) => {
    return (
        <BaseNode 
            label={data.label} 
            background="#F0F0F0"
            color="#212121"
        />
    )
};

export default ConditionalNode