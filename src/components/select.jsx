import { memo } from "react";

export default memo(({ options = [], ...rest }) => (
  <select {...rest} className='select'>
    {options.map(({ id, title }) => (
      <option key={id} value={id}>
        {title}
      </option>
    ))}
  </select>
));