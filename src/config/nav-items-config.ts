import { SubMenu } from "../components/NavBar/SubMenu/SubMenu";
import { MenuItem } from "../components/NavBar/MenuItem/MenuItem";
import { LetterIcon } from '../components/NavBar/LetterIcon/LetterIcon';

export const navItems = [
    {
        title: 'Profile',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/user-profile',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Test',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/test',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Type',
        shortHand: 'T',
        Component: SubMenu,
        to: '/a/type',
        CollapsedIcon: LetterIcon,
        items: [
            {
                title: 'Discounts',
                Component: MenuItem,
                to: '/a/type/discount'
            },
            {
                title: 'Product Category',
                Component: MenuItem,
                to: '/a/type/product-category'
            },
            {
                title: 'Surcharges',
                Component: MenuItem,
                to: '/a/type/surcharge'
            },
            {
                title: 'VIPs',
                Component: MenuItem,
                to: '/a/type/vip'
            }
        ]
    },
    {
        title: 'Product',
        shortHand: 'P',
        Component: MenuItem,
        to: '/a/product',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Order',
        shortHand: 'O',
        Component: MenuItem,
        to: '/a/order',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Employee',
        shortHand: 'E',
        Component: MenuItem,
        to: '/a/employee',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Customer',
        shortHand: 'C',
        Component: MenuItem,
        to: '/a/customer',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Account',
        shortHand: 'A',
        Component: MenuItem,
        to: '/a/Account',
        CollapsedIcon: LetterIcon,
    },
    {
        title: 'Feedback',
        shortHand: 'F',
        Component: MenuItem,
        to: '/a/feedback',
        CollapsedIcon: LetterIcon,
    },
]