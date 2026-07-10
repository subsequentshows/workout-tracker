import { describe, expect, it } from 'vitest';
import html from '../public/index.html?raw';

describe('workout tracker index UI', () => {
	it('keeps legacy workout data without a preselected equipment value', () => {
		expect(html).toContain("dayData[exId].equipment = ''");
		expect(html).toContain("(chưa chọn)");
	});

	it('renders and saves per-exercise equipment choices', () => {
		expect(html).toContain('function setEquipment(event, exId, equipment)');
		expect(html).toContain("getDayExData(exId).equipment = equipment");
		expect(html).toContain("onclick=\"setEquipment(event,'${ex.id}','${opt}')\"");
	});

	it('allows narrow curl to switch between dumbbell, ez bar, and cable', () => {
		expect(html).toContain("ezbarnarrowcurl: ['dumbbell', 'ezbar', 'cable']");
	});

	it('keeps card open state separate from completion state', () => {
		expect(html).toContain('let openCardIds = new Set();');
		expect(html).toContain('const isOpen = openCardIds.has(ex.id);');
		expect(html).not.toContain("openCardIds.add(day.exercises[0].id);");
		expect(html).not.toContain('const isOpen = !data.done;');
	});
});
