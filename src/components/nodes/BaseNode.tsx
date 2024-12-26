import React from "react";
import { Handle, Position } from "reactflow";
import { Box } from "@mui/material";

interface BaseNodeProps {
    label: string;
    background: string;
    color: string;
    borderColor?: string;
    icon?: any
}

const BaseNode: React.FC<BaseNodeProps> = ({ label, background, color, borderColor, icon }) => {
    return (
        <Box
            sx={{
                padding: "4px 8px",
                background: background,
                color: color,
                border: borderColor ? `2px solid ${borderColor}` : `2px solid transparent`,
                borderRadius: "5px",
                height: 'fit-content',
                width: '160px',
                textAlign: "center"
            }}
        >
            <Handle type="target" position={Position.Top} style={{ background: color }} />
            <Box 
                sx={{
                    display: 'flex',
                    fontFamily: 'inter',
                    fontSize: '14px',
                    gap: '4px',
                    fontWeight: 800,
                    height: '20px',
                    margin: '0px',
                    padding: '0px'
                }}
            >
                {icon ?? null}
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {label}
                </Box>
            </Box>
            <Handle type="source" position={Position.Bottom} style={{ background: color }} />
        </Box>
    );
};

export default BaseNode