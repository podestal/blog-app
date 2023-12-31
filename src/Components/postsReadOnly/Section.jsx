import Body from "./Body"

const Section = ({ section }) => {
    return (
        <div>
            <h2 className="section-title">{section.title}</h2>
            {section.bodies.map(body => (
                <Body 
                    key={body.id}
                    body={body}
                />
            ))}
        </div>
    )
}

export default Section