export default function SafeYelliPage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <iframe
        src="/safeyelli-case-study.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          outline: "none",
          display: "block",
          background: "#ffffff",
        }}
        title="SafeYelli case study"
      />
    </div>
  );
}
