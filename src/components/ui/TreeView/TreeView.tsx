import React, { useState } from "react";
import { CheckBox } from "../CheckBox/CheckBox";

interface TreeNode {
  id: number;
  label: string;
  children?: TreeNode[];
}

interface TreeNodeComponentProps {
  node: TreeNode;
  checked: boolean;
  onToggle: (id: number, checked: boolean, parentId?: number) => void;
  checkedNodes: number[];
  parentId?: number;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  onToggle,
  checkedNodes,
  parentId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const checked = checkedNodes.includes(node.id);

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        <CheckBox
          checked={checked}
          onToggle={(val) => onToggle(node.id, val, parentId)}
          label={node.label}
        />
        <span onClick={handleToggle} style={{ cursor: "pointer" }}>
          {node.children && (isOpen ? "-" : "+")}
        </span>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              onToggle={onToggle}
              checked={checked}
              checkedNodes={checkedNodes}
              parentId={node.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  data: TreeNode[];
}

const findParentNode = (
  nodes: TreeNode[],
  childId: number
): TreeNode | null => {
  for (const node of nodes) {
    if (node.children) {
      if (node.children.some((child) => child.id === childId)) {
        return node;
      }
      const parentNode = findParentNode(node.children, childId);
      if (parentNode) {
        return parentNode;
      }
    }
  }
  return null;
};

export const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [checkedNodes, setCheckedNodes] = useState<number[]>([]);

  let nodesToUpdate: number[] = checkedNodes;

  const handleToggle = (id: number, checked: boolean) => {
    const updateParentNodes = (node: TreeNode) => {
      const parent = findParentNode(data, node.id);
      console.log(parent);
      if (parent) {
        const someChildrenChecked = !!parent.children?.some((child) =>
          nodesToUpdate.includes(child.id)
        );
        const allChildrenChecked = !!parent.children?.every((child) =>
          nodesToUpdate.includes(child.id)
        );

        console.log(someChildrenChecked, allChildrenChecked);
        if (allChildrenChecked) {
          nodesToUpdate = [...nodesToUpdate, parent.id];
        }
        if (!allChildrenChecked && someChildrenChecked) {
          nodesToUpdate = nodesToUpdate.filter(
            (nodeId) => nodeId !== parent.id
          );
        }
        updateParentNodes(parent);
      }
    };
    const updateCheckedChildrenNodes = (node: TreeNode, isChecked: boolean) => {
      if (isChecked) {
        nodesToUpdate = [...nodesToUpdate, node.id];
        if (node.children) {
          node.children.forEach((child) => {
            updateCheckedChildrenNodes(child, true);
          });
        }
      } else {
        nodesToUpdate = nodesToUpdate.filter((nodeId) => nodeId !== node.id);
        if (node.children) {
          node.children.forEach((child) => {
            updateCheckedChildrenNodes(child, false);
          });
        }
      }
    };

    const findNodeAndUpdate = (
      nodes: TreeNode[],
      targetId: number,
      checked: boolean
    ) => {
      for (const node of nodes) {
        if (node.id === targetId) {
          updateCheckedChildrenNodes(node, checked);
          updateParentNodes(node);
          return true;
        }
        if (node.children) {
          const found = findNodeAndUpdate(node.children, targetId, checked);
          if (found) return true;
        }
      }
      return false;
    };

    findNodeAndUpdate(data, id, checked);
    setCheckedNodes(nodesToUpdate);
  };

  return (
    <div>
      {data.map((node) => {
        return (
          <TreeNodeComponent
            key={node.id}
            node={node}
            onToggle={handleToggle}
            checked={checkedNodes.includes(node.id)}
            checkedNodes={checkedNodes}
          />
        );
      })}
    </div>
  );
};
