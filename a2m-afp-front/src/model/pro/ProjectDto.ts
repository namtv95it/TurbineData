export class ProjectDto {
    id: number | null
    title: string | null
    description: string | null
    projectType: string | null
    uri: string | null

    constructor(id: number | null, projectType: string | null, title: string | null, uri: string | null, description: string | null) {
        this.id = id
        this.projectType = projectType
        this.title = title
        this.uri = uri
        this.description = description
    }
}