import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import { Button } from "primereact/button";
import PhotoViewer from "./PhotoViewer";
import {
  TbLayoutBottombarExpandFilled,
  TbLayoutNavbarExpandFilled,
} from "react-icons/tb";
import { classNames } from 'primereact/utils';
import { FaCaretDown, FaCaretRight } from "react-icons/fa";


const convertToTreeNodes = (member, path = "0") => {
  const label = member.spouse
    ? `${member.name} & ${member.spouse}`
    : member.name;

  const node = {
    key: path,
    label,
    data: member,
    icon: member.photo ? "pi pi-user" : "pi pi-fw pi-users",
    children: [],
    name: member.name,
    spouse: member.spouse,
    description: member?.description,
    photo: member?.photo,
    uniqueid: member?.id,
  };

  if (member.children && member.children.length > 0) {
    node.children = member.children.map((child, idx) =>
      convertToTreeNodes(child, `${path}-${idx}`)
    );
  }

  return node;
};

const MobileView = ({ familyData }) => {
  const [nodes, setNodes] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState({ 0: true });

  const expandAll = () => {
    const _expandedKeys = {};

    const traverse = (node) => {
      if (node.children && node.children.length > 0) {
        _expandedKeys[node.key] = true;
        node.children.forEach((child) => traverse(child));
      }
    };

    nodes.forEach(traverse);
    setExpandedKeys(_expandedKeys);
  };

  const collapseAll = () => {
    setExpandedKeys({});
  };

  useEffect(() => {
    if (familyData && Object.keys(familyData).length > 0) {
      const treeData = [convertToTreeNodes(familyData)];
      setNodes(treeData);
    }
  }, [familyData]);

  // Custom node template with generation badge
  const nodeTemplate = (node) => {
    const [isOpen, setIsOpen] = useState(false);

    const [photo, setPhoto] = useState(null);

    // console.log(`actual data - `,photo);

    const handleOpen = (da) => {
      setPhoto(da);
      setIsOpen(true);
    };

    return (
      <div
        className="family-node-content"
        style={{
          background: "#21ac53",
          padding: "5px",
          borderRadius: "5px",
          marginLeft:
            node?.name == "Mrs.Aishwarya" || node?.name == "Mr.Akshay" || node?.name == "Mr.Ashish" || node?.name == "Mr.Abijeet" || node?.name == "Mr.Tarun Richard"  ? "60px" :
            node?.name == "Ms.Rona Samuel" || node?.name == "Ms.Mita Samuel" ? "120px" :
            node?.name == "Dr.Ajeet Kumar Lal Mohan" || node?.name == "Dr.Ashok Lal Mohan" || node?.name == "Mrs.Monisha Alexander"  ? "30px" : "",
          width:
            node?.name == "Mrs.Aishwarya" || node?.name == "Mr.Akshay" || node?.name == "Mr.Ashish" || node?.name == "Mr.Abijeet" || node?.name == "Mr.Tarun Richard" ? "85%" :
             node?.name == "Ms.Rona Samuel" || node?.name == "Ms.Mita Samuel" ? "70%" : 
             node?.name == "Dr.Ajeet Kumar Lal Mohan" || node?.name == "Dr.Ashok Lal Mohan" || node?.name == "Mrs.Monisha Alexander" ? "93%" : "",
        }}
        onClick={() => {
          if (node?.photo || node?.description) {
            handleOpen(node);
          }
        }}
      >
        {node.data.generation && (
          <div className="family-generation-badge">
            <span className="family-gen-arrow">→</span>
            <span className="family-gen-text">
              Generation {node.data.generation}
            </span>
          </div>
        )}

        {/* {node?.description && (
           <div className=" h-[10px] w-[10px] bg-yellow-400 absolute left-0 top-0 rounded-full"></div>
        )} */}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {node?.photo && (
            <img
              src={node?.photo}
              className=" h-[50px] w-[50px] rounded-full"
            />
          )}

          <div className="family-member-name">
            <p>{node.name}</p>
            <p>{node.spouse}</p>
          </div>
        </div>

        <PhotoViewer isOpen={isOpen} setIsOpen={setIsOpen} data={photo} />
      </div>
    );
  };

const togglerTemplate = (node, options) => {
    if (!node) {
        return;
    }

    const expanded = options.expanded;
    const IconComponent = expanded ? FaCaretDown : FaCaretRight;

    return (
        <button
            type="button"
            className="p-tree-toggler p-link "
            tabIndex={-1}
            onClick={options.onClick}
        >
            <IconComponent aria-hidden="true" size={'2rem'} />
        </button>
    );
};

  return (
    <div className="family-tree-container">
      <div className="family-tree-controls">
        <Button
          type="button"
          icon="pi pi-plus"
          label={<TbLayoutNavbarExpandFilled size={"1.5rem"} />}
          onClick={expandAll}
          className="p-button-sm family-tree-button"
        />
        <Button
          type="button"
          icon="pi pi-minus"
          label={<TbLayoutBottombarExpandFilled size={"1.5rem"} />}
          onClick={collapseAll}
          className="p-button-sm family-tree-button"
        />
      </div>

      <div className="family-tree-wrapper">
        <Tree
          value={nodes}
          expandedKeys={expandedKeys}
          onToggle={(e) => setExpandedKeys(e.value)}
          nodeTemplate={nodeTemplate}
          togglerTemplate={togglerTemplate}
          className="family-tree"
        />
      </div>

      <style jsx>{`
        .family-tree-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .family-tree-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
          justify-content: end;
          width: 100%;
        }

        .family-tree-button {
          background: #21ac53;
          border: none;
          padding: 10px;
          border-radius: 10px;
          color: white !important;
        }

        .family-tree-wrapper {
          width: 100%;
          max-width: 800px;
        }

        /* Unique class names to prevent conflicts */
        .family-tree :global(.p-tree) {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          border: none;
          background: transparent;
        }

        .family-tree :global(.p-treenode) {
          margin-bottom: 0.4rem;
        }

        .family-tree :global(.p-treenode-content) {
          padding: 0.8rem 1rem;
          border-radius: 6px;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-left: 3px solid #4a6fa5;
          transition: all 0.3s;
        }

        .family-tree :global(.p-treenode-content:hover) {
          background: #e9f2ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .family-tree :global(.p-treenode-content.p-highlight) {
          background: #d7e5ff;
          color: inherit;
        }

        .family-tree :global(.p-treenode-children) {
          padding-left: 5rem !important;
          margin-left: 5rem !important;
          border-left: 1px solid #d0d0d0;
        }

        .family-node-content {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .family-generation-badge {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          margin-bottom: 0.3rem;
          color: #5a5a5a;
        }

        .family-gen-arrow {
          margin-right: 0.4rem;
          font-weight: bold;
          color: rgb(52, 49, 221);
        }

        .family-gen-text {
          font-weight: 600;
          color: rgb(52, 49, 221);
        }

        .family-member-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgb(255, 255, 255);
        }

        .family-tree :global(.p-tree-toggler) {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: #f0f8ff;
          border: 1px solid #c0d6ff;
          border-radius: 4px;
          width: 1.8rem;
          height: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .family-tree :global(.p-tree-toggler:hover) {
          background: #d0e4ff;
          border-color: #3b82f6;
        }

        .family-tree :global(.p-treenode-content) {
          position: relative;
          padding-right: 3rem;
        }
      `}</style>
    </div>
  );
};

export default MobileView;
