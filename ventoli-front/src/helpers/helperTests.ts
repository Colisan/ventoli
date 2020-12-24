/*
import { expect } from 'chai';
import { Wrapper } from '@vue/test-utils';
import { routes } from '@/router';

export function testWrapperForRouterPath(
	wrapper: Wrapper<any>,
	routerPathName: string
): void {
	const matchingPaths = routes.filter(
		(route: any) => route.name === routerPathName
	);
	expect(matchingPaths).to.have.lengthOf(1);
	const targetLink = matchingPaths[0].path;
	const linkWrapper = wrapper.find(`*[to='${targetLink}']`);
	expect(linkWrapper.exists()).to.be.true;
}

export default {
	testWrapperForRouterPath,
};
*/
