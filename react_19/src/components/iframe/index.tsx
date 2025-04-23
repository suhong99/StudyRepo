import Iframe from "./Iframe";

const IframeLayout = () => {
  return (
    <div>
      <section
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <Iframe />
      </section>
    </div>
  );
};

export default IframeLayout;
