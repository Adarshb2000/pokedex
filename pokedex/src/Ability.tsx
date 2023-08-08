const Ability = ({
  name,
  value,
  color = 'var(--third)',
}: {
  name: string
  value: number
  color?: string
}) => {
  return (
    <div className="ability">
      <h6>{name}</h6>
      <h5>{value}</h5>
      <div>
        <div
          style={{
            width: value / 15000 + '%',
            height: '100%',
            background: color,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Ability
