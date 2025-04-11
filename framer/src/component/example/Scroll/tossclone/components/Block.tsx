type BlockProps = {
  height: number | string;
};

const Block: React.FC<BlockProps> = ({ height }) => {
  return <div style={{ height }} />;
};

export default Block;
