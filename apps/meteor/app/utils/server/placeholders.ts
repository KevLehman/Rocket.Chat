import { strLeft, strRightBack } from '../../../lib/utils/stringUtils';
import { settings } from '../../settings/server';

export const placeholders = {
	replace: (
		str: string,
		data: { name?: string; email?: string; password?: string; reason?: string; user?: string; room?: string; unsubscribe?: string },
	) => {
		if (!str) {
			return '';
		}

		str = str.replaceAll(/\[Site_Name\]/g, settings.get<string>('Site_Name') || '');
		str = str.replaceAll(/\[Site_URL\]/g, settings.get<string>('Site_Url') || '');

		if (data) {
			str = str.replaceAll(/\[name\]/g, data.name || '');
			str = str.replaceAll(/\[fname\]/g, strLeft(data.name, ' ') || '');
			str = str.replaceAll(/\[lname\]/g, strRightBack(data.name, ' ') || '');
			str = str.replaceAll(/\[email\]/g, data.email || '');
			str = str.replaceAll(/\[password\]/g, data.password || '');
			str = str.replaceAll(/\[reason\]/g, data.reason || '');
			str = str.replaceAll(/\[User\]/g, data.user || '');
			str = str.replaceAll(/\[Room\]/g, data.room || '');

			if (data.unsubscribe) {
				str = str.replaceAll(/\[unsubscribe\]/g, data.unsubscribe);
			}
		}

		str = str.replaceAll(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');

		return str;
	},
};
