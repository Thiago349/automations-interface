import { useEffect, useState } from "react"
import { ActionNode, ErrorNode, TriggerNode, BranchNode, ResponseNode, AuthNode, FlowNode, LoopNode, ConditionNode } from "../../components"
import { useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Box, Button, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ReactFlow, { Background } from "reactflow"
import "reactflow/dist/style.css"
import { getFlow } from "../../services/api/instance"

interface BlockDictionary {
    [key: string]: { next: string[], type?: string, label?: string }
}

interface Edge {
    id: string
    source: string
    target: string
    animated: boolean
}

interface Node {
    id: string
    type?: string
    data: { label: string }
    position: { x: number, y: number }
}

const nodeTypes = {
    ACTION: ActionNode,
    AUTH: AuthNode,
    BRANCH: BranchNode,
    CONDITION: ConditionNode,
    ERROR: ErrorNode,
    FLOW: FlowNode,
    LOOP: LoopNode,
    RESPONSE: ResponseNode,
    TRIGGER: TriggerNode
}

const calculateNodePositions = (blockDictionary: BlockDictionary): { nodes: Node[], edges: Edge[] } => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    const correctOrder = new Set<string>()
    const blockLayers: { [key: string]: number } = {}
    const blocksForLayers: { [key: string]: { max: number, positioned: number } } = {}
    let maxBlocksByLayer = 0

    let startTrigger = blockDictionary["startTrigger"]
    if (!!startTrigger) {
        let toExecuteArray = ["startTrigger"]
        let executionLayer = 0
        while (!!toExecuteArray.length) {
            let newToExecuteArray: string[] = []
            for (const blockName of toExecuteArray) {
                if (!blockDictionary[blockName]) {
                    blockDictionary[blockName] = {
                        next: [],
                        type: "ERROR"
                    }
                }
                let blockData = blockDictionary[blockName]
                const blockNext = blockData.next
                blockLayers[blockName] = executionLayer
                if (correctOrder.has(blockName)) correctOrder.delete(blockName)
                correctOrder.add(blockName)
                for (const nextBlock of blockNext) {
                    if (!newToExecuteArray.includes(nextBlock)) newToExecuteArray.push(nextBlock)
                }
            }
            blocksForLayers[executionLayer.toString()] = { max: 0, positioned: 0 }
            if (newToExecuteArray) toExecuteArray = [...newToExecuteArray]
            else break
            executionLayer += 1
        }
        for (const layer of Object.values(blockLayers)) {
            blocksForLayers[layer.toString()].max = blocksForLayers[layer].max += 1
            if (maxBlocksByLayer < blocksForLayers[layer].max) maxBlocksByLayer = blocksForLayers[layer].max
        }
        const maxWidth = (maxBlocksByLayer * 240) - 80
        for (const blockName of correctOrder.values()) {
            const blockData = blockDictionary[blockName]
            const blockNext = blockData.next
            const blockLayerNumber = blockLayers[blockName]
            const blockLayerData = blocksForLayers[blockLayerNumber]
            const blockLayerMax = blockLayerData.max
            const blockLayerPosition = blockLayerData.positioned
            const distanceBetweenBlocks = (maxWidth - (blockLayerMax * 160)) / (blockLayerMax + 1)
            nodes.push({
                id: blockName, 
                type: blockData.type,
                data: { label: blockData.label ?? blockName },
                position: { x: (distanceBetweenBlocks + 160) * (blockLayerPosition) + distanceBetweenBlocks, y: (75 * blockLayerNumber) }
            })
            edges.push(...blockNext.map((target): Edge => {
                return {
                    id: `e${blockName}-${target}`,
                    source: blockName,
                    target: target,
                    animated: true
                }
            }))
            blocksForLayers[blockLayerNumber].positioned += 1
        }
    }

    return {
        nodes,
        edges
    }
}

const Flow = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const path = queryParams.get("path") || ""

    const { data: flow, isLoading } = useQuery({
        queryKey: ["getFlow", path],
        queryFn: () => getFlow(path),
    })

    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])

    useEffect(() => {
        if (flow) {
            const { nodes, edges } = calculateNodePositions(flow)
            setNodes(nodes)
            setEdges(edges)
        }
    }, [flow])

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#212121",
                color: "#FFC107"
            }}
        >
            <Button
                onClick={() => navigate("/selector")}
                variant="outlined"
                sx={{
                    top: '16px',
                    left: '16px',
                    zIndex: 10,
                    color: "#FFC107",
                    borderColor: "#FFC107",
                    position: "absolute",
                    "&:hover": { backgroundColor: "#FFC107", color: "#212121" },
                }}
            >
                <ArrowBackIcon />
            </Button>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: "absolute",
                    top: '16px',
                    right: '16px',
                    zIndex: 10,
                    color: "#FFC107",
                    height: '32px',
                    padding: "2px 0px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontFamily: 'inter',
                    fontWeight: 600
                }}
            >
                {path}
            </Typography>
            {
                isLoading ? (
                    <Typography
                        variant="h5"
                        sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    >
                        Loading...
                    </Typography>
                ) : nodes.length > 0 ? (
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView
                        style={{ height: "60vh" }}
                    >
                        <Background gap={12} size={1} color="#FFC107" />
                    </ReactFlow>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{ position: "absolute", fontFamily: 'inter', top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    >
                        No data available for this flow.
                    </Typography>
                )
            }
        </Box>
    )
}

export default Flow
