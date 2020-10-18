export default function ArchivedProjectsToggle({ id, value, onChange, label }) {
  return (
    <>
      <input id={id} type="checkbox" checked={value} onChange={onChange}/>
      <label htmlFor={id}>{label}</label>
      <style jsx>{`
        input {
          margin-right: 0.7em;
        }
  
        label {
          font-size: 0.8em;
          color: #999;
        }
      `}</style>
    </>
  );
}
