const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const matrixModal = document.getElementById("matrix-modal");
const matrixDisplay = document.getElementById("matrix-display");
let nodes = [];
let edges = [];
let mstEdges = [];
let isDraggingNode = false;
let isDraggingEdge = false;
let selectedNode = null;
let tempEdge = null;
let adjacency_matrix = [];

class Node {
  constructor(x, y) {
    this.id = nodes.length;
    this.x = x;
    this.y = y;
    this.radius = 20;
  }
}

class Edge {
  constructor(source, target) {
    this.source = source;
    this.target = target;
    this.weight = null;
  }

  getWeight(nodes) {
    if (this.weight !== null) return this.weight;
    const s = nodes[this.source];
    const t = nodes[this.target];
    return (Math.hypot(s.x - t.x, s.y - t.y) / 30).toFixed(0);
  }
}

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  render();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (const node of nodes) {
    const dx = x - node.x;
    const dy = y - node.y;
    if (dx * dx + dy * dy <= node.radius * node.radius) {
      // drag node
      if (e.shiftKey) {
        isDraggingNode = true;
        selectedNode = node;
        return;
      }
      // create node
      else {
        isDraggingEdge = true;
        selectedNode = node;
        tempEdge = { x1: node.x, y1: node.y, x2: x, y2: y };
        return;
      }
    }
  }

  // add the new node if not pressing shift
  if (!e.shiftKey) {
    nodes.push(new Node(x, y));
    render();
  }
});

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isDraggingNode) {
    selectedNode.x = x;
    selectedNode.y = y;
    render();
  } else if (isDraggingEdge) {
    tempEdge.x2 = x;
    tempEdge.y2 = y;
    render();
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (isDraggingNode) {
    isDraggingNode = false;
    selectedNode = null;
  } else if (isDraggingEdge) {
    isDraggingEdge = false;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodes) {
      if (node === selectedNode) continue;
      const dx = x - node.x;
      const dy = y - node.y;
      if (dx * dx + dy * dy <= node.radius * node.radius) {
        edges.push(new Edge(selectedNode.id, node.id));
        break;
      }
    }
    selectedNode = null;
    tempEdge = null;
    render();
  }
});

canvas.addEventListener("dblclick", (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const edge = findClosestEdge(x, y);
  if (edge) {
    const currentWeight = edge.getWeight(nodes);
    const newWeight = prompt(
      `Enter new weight for this edge (${edge.source} ↔ ${edge.target}) :`,
      currentWeight,
    );
    if (newWeight !== null) {
      const num = parseFloat(newWeight);
      if (!isNaN(num)) {
        edge.weight = num;
        render();
      } else {
        alert("Please enter a valid number");
      }
    }
  }
});

function findClosestEdge(x, y) {
  let closestEdge = null;
  let minDist = Infinity;

  for (const edge of edges) {
    const s = nodes[edge.source];
    const t = nodes[edge.target];
    const d = distanceToSegment(x, y, s.x, s.y, t.x, t.y);
    if (d < minDist && d < 10) {
      minDist = d;
      closestEdge = edge;
    }
  }
  return closestEdge;
}

function distanceToSegment(x, y, x1, y1, x2, y2) {
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;
  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return Math.hypot(x - xx, y - yy);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw edges
  edges.forEach((edge) => {
    const source = nodes[edge.source];
    const target = nodes[edge.target];
    drawEdge(source, target, edge.getWeight(nodes), "gray");
  });

  // draw MST edges
  mstEdges.forEach((edge) => {
    const source = nodes[edge.source];
    const target = nodes[edge.target];
    drawEdge(source, target, edge.getWeight(nodes), "#10B981", 4);
  });

  // draw temporary edge
  if (tempEdge) {
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(tempEdge.x1, tempEdge.y1);
    ctx.lineTo(tempEdge.x2, tempEdge.y2);
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw nodes
  nodes.forEach((node) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#3B82F6";
    ctx.fill();
    ctx.strokeStyle = "#1D4ED8";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.id, node.x, node.y);
  });
}

function drawEdge(source, target, weight, color, width = 2) {
  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(target.x, target.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();

  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;
  ctx.fillStyle = color;
  ctx.font = "14px Arial";
  ctx.fillText(weight, midX, midY - 10);
}

async function computeMSTServer() {
  if (nodes.length < 1) return;

  const postData = {
    node_count: nodes.length,
    edges: edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      weight: parseFloat(edge.getWeight(nodes)),
    })),
  };

  try {
    const response = await fetch("/api/graph/mst/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();

    mstEdges = data.mst_edges.map((e) => {
      const edge = new Edge(e.source, e.target);
      edge.customWeight = e.weight;
      return edge;
    });

    if (data.adjacency_matrix != undefined || data.adjacency_matrix != null) {
      adjacency_matrix = data.adjacency_matrix;
    }

    render();
  } catch (error) {
    alert(`Failed to compute MST: ${error.message}`);
  }
}

function clearCanvas() {
  nodes = [];
  edges = [];
  mstEdges = [];

  isDraggingNode = false;
  isDraggingEdge = false;
  selectedNode = null;
  tempEdge = null;
  adjacency_matrix = [];

  render();
}

function renderMatrixDisplay() {
  if (adjacency_matrix.length == 0) {
    matrixDisplay.innerHTML = `
      Matrix empty, create a <span class="text-red-500 mx-1"> connected graph </span> & click <span class="py-1 px-2 bg-green-500 ml-2 text-white rounded">Calculate MST</span>
    `;
    return;
  }

  matrixDisplay.innerHTML = "";
  const size = adjacency_matrix.length;

  const matrixWrapper = document.createElement("div");
  matrixWrapper.className =
    "relative bg-gray-50 p-6 pl-[35px] rounded-lg shadow-lg border-2 border-blue-400";

  const leftBracket = document.createElement("div");
  leftBracket.className =
    "absolute left-0 top-0 bottom-0 w-3 flex flex-col mx-4 my-3";
  leftBracket.innerHTML = `
    <div class="h-2 w-full border-l-4 border-t-4 border-gray-800"></div>
    <div class="flex-grow border-l-4 border-gray-800"></div>
    <div class="h-2 w-full border-l-4 border-b-4 border-gray-800"></div>
  `;
  matrixWrapper.appendChild(leftBracket);

  const rightBracket = document.createElement("div");
  rightBracket.className =
    "absolute right-0 top-0 bottom-0 w-3 flex flex-col mr-4 my-3";
  rightBracket.innerHTML = `
    <div class="h-2 w-full border-r-4 border-t-4 border-gray-800"></div>
    <div class="flex-grow border-r-4 border-gray-800"></div>
    <div class="h-2 w-full border-r-4 border-b-4 border-gray-800"></div>
  `;
  matrixWrapper.appendChild(rightBracket);

  const matrixGrid = document.createElement("div");
  matrixGrid.className = "inline-grid gap-2 mx-4";
  matrixGrid.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

  const top_indexes = document.createElement("div");
  top_indexes.className = "grid gap-2 mx-4 mb-2 pl-8";
  top_indexes.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

  for (let i = 0; i < size; i++) {
    const top_index = document.createElement("span");
    top_index.textContent = i;
    top_index.className =
      "w-12 flex text-[#39b600] items-center justify-center font-bold";
    top_indexes.appendChild(top_index);
  }
  matrixWrapper.append(top_indexes);

  const side_indexes = document.createElement("div");
  side_indexes.className = "inline-flex flex-col gap-y-2 mb-2";
  side_indexes.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

  for (let i = 0; i < size; i++) {
    const side_index = document.createElement("span");
    side_index.textContent = i;
    side_index.className = "w-8 h-12 flex text-[#39b600] font-bold";
    side_indexes.appendChild(side_index);
  }
  matrixWrapper.append(side_indexes);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.className =
        "matrix-cell cursor-pointer w-12 h-12 bg-white flex items-center justify-center font-semibold text-lg rounded-md shadow-sm border border-gray-200";
      cell.textContent = adjacency_matrix[i][j];

      cell.addEventListener("click", function () {
        if (cell.classList.contains("bg-blue-100")) {
          cell.classList.remove("bg-blue-100", "cell-highlight");
        } else {
          cell.classList.add("bg-blue-100", "cell-highlight");
        }
      });

      matrixGrid.appendChild(cell);
    }
  }

  matrixWrapper.appendChild(matrixGrid);
  matrixDisplay.appendChild(matrixWrapper);
}

function ShowMatrix() {
  renderMatrixDisplay();
  matrixModal.showModal();
}
