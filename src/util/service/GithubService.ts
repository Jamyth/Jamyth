import axios from "axios";
import type { RepositoryView, ProfileView } from "../../type/api";

export class GithubService {
    static readonly origin = "https://api.github.com";

    static async getProfile(): Promise<ProfileView> {
        return (await axios.get(`${this.origin}/users/Jamyth`)).data;
    }

    static async getRepositories(page: number): Promise<RepositoryView[]> {
        return (
            await axios.get(`${this.origin}/users/Jamyth/repos`, {
                params: {
                    page,
                },
            })
        ).data;
    }
}
