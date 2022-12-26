import axios from "axios";
import type { RepositoryView, ProfileView } from "../../type/api";

export class GithubService {
    static readonly origin = "https://api.github.com";

    static async getProfile(): Promise<ProfileView> {
        try {
            return (await axios.get(`${this.origin}/users/Jamyth`)).data;
        } catch (error) {
            console.error("Fetching Profile Error");
            return { public_repos: 0 };
        }
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
