import { IPattern } from "types/IPattern";
import { PatternCard } from "./PatternCard/PatternCard";
import styles from "./PatternList.module.scss";
import { Input } from "./../ui";
import { useState } from "react";
import { CheckBox } from "../../components/ui/CheckBox/CheckBox";
import { TreeView } from "../../components/ui/TreeView/TreeView";

const InputExample = () => {
  const [val, setVal] = useState("");
  return (
    <Input
      labelText="Label"
      id="input_first_id"
      value={val}
      onChange={(val) => setVal(val)}
    />
  );
};

const treeData = [
  {
    id: 1,
    label: "Node 1",
    children: [
      {
        id: 2,
        label: "Node 1.1",
        children: [
          { id: 3, label: "Node 1.1.1" },
          { id: 4, label: "Node 1.1.2" },
        ],
      },
      { id: 5, label: "Node 1.2" },
    ],
  },
  {
    id: 6,
    label: "Node 2",
    children: [
      { id: 7, label: "Node 2.1" },
      { id: 8, label: "Node 2.2" },
    ],
  },
];

const patterns: IPattern[] = [
  {
    title: "Text Input",
    link: "#",
    component: <InputExample />,
    description: `Простое текстовое поле ввода с анимацией лейбла. Поддерживает следующие типы:\n <Input type='text'>\n <Input type='search'>\n <Input type='number'>. Остальные не пробовал :)`,
  },
  {
    title: "Checkbox",
    link: "#",
    component: <CheckBox label="Toggle me" />,
    description: `Чекбокс`,
  },

  {
    title: "Checkbox Tree",
    link: "#",
    component: <TreeView data={treeData} />,
    description: `Дерево чекбоксов`,
  },
];

export const PatternList = () => {
  return (
    <ul className={styles["pattern-list"]}>
      {patterns.map((pattern, idx) => (
        <PatternCard key={pattern + "_" + idx} {...pattern} />
      ))}
    </ul>
  );
};
