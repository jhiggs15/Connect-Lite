// creates icons from ant-design
export function getItem(label, key, icon, testid, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
      "data-testid" : testid
    };
  }