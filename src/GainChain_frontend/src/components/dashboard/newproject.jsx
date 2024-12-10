import { Button } from "../ui/button"

function NewProject() {
    return (
        <Button onClick={handleStartProject}>Start Project</Button>
    );
}

function handleStartProject() {
    console.log("Start Project button clicked");
    // Add your logic to start the project here
}

export default NewProject;
