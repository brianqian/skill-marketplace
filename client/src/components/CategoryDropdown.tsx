import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';

type Props = {
  defaultValue?: string;
  title?: string;
  name?: string;
  onChange?: () => void;
};

const CategoryDropdown = React.forwardRef((props: Props, ref?: React.Ref<HTMLSelectElement>) => {
  const { title, defaultValue, onChange, name } = props;
  const categories = useSelector((state: RootState) => state.app.categories);

  return (
    <select name={name} id="" defaultValue={defaultValue} ref={ref} onChange={onChange}>
      {!!title && <option value="">{title}</option>}
      {categories.map(category => {
        return <option value={category}>{category}</option>;
      })}
    </select>
  );
});

export default CategoryDropdown;
