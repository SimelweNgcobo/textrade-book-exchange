export default function MyComponent(props: any) {
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: "rgb(30, 30, 30)",
        cursor: "default",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "white",
        }}
      >
        Component Content
      </div>
    </div>
  );
}
