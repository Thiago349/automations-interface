import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getFlowsList } from "../../services/api/instance";

export const Selector = () => {
    const navigate = useNavigate();
    const { data: flowList, isLoading } = useQuery({
        queryKey: ["getFlowsList"],
        queryFn: getFlowsList,
    });

    const [currentLevel, setCurrentLevel] = useState<Record<string, any> | null>(null);
    const [pathStack, setPathStack] = useState<string[]>([]);

    const createTree = (paths: string[]): Record<string, any> => {
        const tree: Record<string, any> = {};
        paths.forEach((path) => {
            const parts = path.split("/");
            let currentLevel = tree;
            parts.forEach((part, index) => {
                if (index != 0) {
                    if (!currentLevel[part]) {
                        currentLevel[part] = index === parts.length - 1 ? null : {};
                    }
                    currentLevel = currentLevel[part];
                }
            });
        });
        return tree;
    };

    const goBack = () => {
        if (pathStack.length > 0) {
            const newStack = [...pathStack];
            newStack.pop();
            setPathStack(newStack);

            let newLevel = createTree(flowList || []);
            newStack.forEach((key) => {
                newLevel = newLevel[key];
            });

            setCurrentLevel(newLevel);
        }
    };

    const handleItemClick = (key: string, value: any) => {
        if (value) {
            setPathStack((prev) => [...prev, key]);
            setCurrentLevel(value)
        } else {
            const fullPath = `/${[...pathStack, key].join("/")}`;
            navigate(`/flow?path=${encodeURIComponent(fullPath)}`);
        }
    };

    if (isLoading) {
        return <></>;
    }

    const treeData = flowList ? createTree(flowList) : {};

    const displayLevel = currentLevel || treeData;

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: "column",
                backgroundColor: "#212121"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: '32px 32px',
                    maxWidth: 750,
                    height: "70vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#212121",
                    color: "#FFC107",
                    border: '1px solid #FFC107',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: "#FFC107", fontWeight: 300, fontFamily: 'inter' }}
                >
                    Automations
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="#BDBDBD"
                    gutterBottom
                    sx={{ marginBottom: 2, fontStyle: "italic", fontFamily: 'inter' }}
                >
                    /{pathStack.join("/")}
                </Typography>
                <Button
                    onClick={goBack}
                    variant="outlined"
                    sx={{ 
                        marginBottom: 2, 
                        display: "flex", 
                        alignItems: "center", 
                        color: "#FFC107", 
                        borderColor: "#FFC107", 
                        "&:hover": { backgroundColor: "#FFC107", color: '#212121' },
                    }}
                    disabled={pathStack.length == 0}
                >
                    <ArrowBackIcon sx={{ marginRight: 1 }} />
                </Button>
                <Box
                    sx={{
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: 1,
                        padding: 2,
                        overflowY: "auto",
                        flexGrow: 1,
                        "&::-webkit-scrollbar": {
                            width: "10px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#424242",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#FFC107",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#FFD54F",
                        }
                    }}
                >
                    <List>
                        {
                            Object.entries(displayLevel).map(([key, value]) => (
                                <ListItem
                                    key={key}
                                    onClick={() => handleItemClick(key, value)}
                                    sx={{
                                        padding: 1,
                                        borderRadius: 1,
                                        backgroundColor: "inherit",
                                        "&:hover": { 
                                            backgroundColor: "#424242", 
                                            cursor: "pointer" 
                                        },
                                    }}
                                >
                                    <ListItemText primary={key} disableTypography sx={{ color: !value ? '#FFC107' : '#BDBDBD', fontFamily: 'archivo' }} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Paper>
        </Box>
    );
};

export default Selector;
