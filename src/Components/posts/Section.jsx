import BodyForm from "./BodyForm"
import Bodies from "./Bodies"

const Section = ({ section }) => {
    return (
        <div>
            <h3>{section.title} || {section.id}</h3>
            {/* <Bodies 
                section={section}
            /> */}
            <BodyForm 
                section={section}
            /> 
        </div>
    )
}

export default Section