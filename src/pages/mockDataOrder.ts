
export const mockOrders: Order[] = [
    {
        id: 1,
        userId: 123,
        totalPrice: 450000,
        status: 'pending',
        items: [
            {
                id: 101,
                orderId: 1,
                productId: 1,
                quantity: 2,
                price: 200000,
            },
            {
                id: 102,
                orderId: 1,
                productId: 2,
                quantity: 1,
                price: 250000,
            },
        ],
    },
    {
        id: 2,
        userId: 123,
        totalPrice: 150000,
        status: 'paid',
        items: [
            {
                id: 103,
                orderId: 2,
                productId: 3,
                quantity: 3,
                price: 150000,
            },
        ],
    },
    {
        id: 3,
        userId: 123,
        totalPrice: 300000,
        status: 'cancelled',
        items: [
            {
                id: 104,
                orderId: 3,
                productId: 1,
                quantity: 1,
                price: 100000,
            },
            {
                id: 105,
                orderId: 3,
                productId: 4,
                quantity: 1,
                price: 200000,
            },
        ],
    },
];

// Hàm mock để lấy danh sách đơn hàng của người dùng.
export const getOrdersByUser = async (): Promise<Order[]> => {
    // Mô phỏng độ trễ của mạng.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockOrders);
        }, 500); // 500ms delay
    });
};

// Hàm mock để lấy chi tiết sản phẩm.
// Bạn có thể sử dụng hàm này để hiển thị tên và ảnh sản phẩm thay vì chỉ có productId.
export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export const getProductDetails = async (productId: number): Promise<Product> => {
    // Dữ liệu mock cho các sản phẩm
    const mockProducts: { [key: number]: Product } = {
        1: { id: 1, name: 'Túi xách thời trang', price: 100000, imageUrl: '/images/bag.jpg' },
        2: { id: 2, name: 'Đồng hồ thông minh', price: 250000, imageUrl: '/images/watch.jpg' },
        3: { id: 3, name: 'Tai nghe Bluetooth', price: 50000, imageUrl: '/images/headphone.jpg' },
        4: { id: 4, name: 'Sạc dự phòng', price: 200000, imageUrl: '/images/powerbank.jpg' },
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = mockProducts[productId];
            if (product) {
                resolve(product);
            } else {
                reject(new Error('Sản phẩm không tồn tại'));
            }
        }, 300); // 300ms delay
    });
};

// Định nghĩa các kiểu dữ liệu để đảm bảo an toàn kiểu.
export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    userId: number;
    totalPrice: number;
    status: 'pending' | 'paid' | 'cancelled';
    items?: OrderItem[];
}

