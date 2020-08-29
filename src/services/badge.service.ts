import fetch, { Response } from 'node-fetch';
import { config } from 'dotenv';
import cheerio from 'cheerio';
import Badge from '../models/badge.model';

config();

const PROFILE_URL: string = process.env.ACCLAIM_PROFILE_URL;
const BADGE_URL: string = process.env.ACCLAIM_BADGE_URL;
const BADGE_ELEMENT: string = '.cr-public-earned-badge-grid-item';

class BadgeService {
    protected $: CheerioStatic;

    constructor() {
        this.$ = null;
    }

    public async getAllBadges(): Promise<Array<Badge>> {
        const response: Response = await fetch(PROFILE_URL);
        const html: string = await response.text();
        const badges: Array<Badge> = [];

        this.$ = cheerio.load(html);

        this.$(BADGE_ELEMENT).each((i, badge) => {
            const { title, href } = badge.attribs;
            const id = href.split('/')[2];
            const image = this.$(badge).find('div img').attr('src');
            const information = `${BADGE_URL}/${id}`;

            badges.push({
                id,
                title,
                image,
                information,
            });
        });

        return badges;
    }
}

export default BadgeService;
