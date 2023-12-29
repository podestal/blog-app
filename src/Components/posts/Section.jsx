import BodyForm from "./BodyForm"
import Bodies from "./Bodies"

const Section = ({ section }) => {
    return (
        <div>
            <Bodies 
                section={section}
            />
            <p>{section.title}</p>
            
            <BodyForm 
                section={section}
            />
        </div>
    )
}

export default Section