-- Insert categories
INSERT INTO categories (name, description, slug, image) VALUES
('Arduino', 'Arduino boards, shields, and accessories', 'arduino', 'https://source.unsplash.com/400x300/?arduino,microcontroller'),
('Sensors', 'Temperature, motion, light, and other sensors', 'sensors', 'https://source.unsplash.com/400x300/?sensors,electronics'),
('Modules', 'Display, audio, and communication modules', 'modules', 'https://source.unsplash.com/400x300/?display,module,electronics'),
('Robotics', 'Robot kits, parts, and accessories', 'robotics', 'https://source.unsplash.com/400x300/?robot,robotics'),
('Components', 'LEDs, resistors, capacitors, and basic components', 'components', 'https://source.unsplash.com/400x300/?led,resistor,components'),
('Development Boards', 'Raspberry Pi, ESP32, and other development boards', 'development-boards', 'https://source.unsplash.com/400x300/?raspberry,pi,development'),
('IoT', 'WiFi, Bluetooth, and IoT communication modules', 'iot', 'https://source.unsplash.com/400x300/?wifi,iot,module'),
('Learning', 'Books, courses, and educational materials', 'learning', 'https://source.unsplash.com/400x300/?books,learning,education')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Arduino Uno R3',
  'The classic Arduino board perfect for beginners and professionals. Features ATmega328P microcontroller, 14 digital I/O pins, 6 analog inputs, and USB connectivity.',
  1999.00,
  c.id,
  50,
  ARRAY['https://source.unsplash.com/400x400/?arduino,microcontroller', 'https://source.unsplash.com/400x400/?electronics,circuit'],
  4.8,
  156,
  true
FROM categories c WHERE c.slug = 'arduino'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Raspberry Pi 4 Model B 4GB',
  'Powerful single-board computer with 4GB RAM, quad-core Cortex-A72 processor, dual 4K display support, and various connectivity options. Perfect for IoT projects and robotics.',
  4999.00,
  c.id,
  35,
  ARRAY['https://source.unsplash.com/400x400/?raspberry,pi', 'https://source.unsplash.com/400x400/?sbc,computer'],
  4.9,
  203,
  true
FROM categories c WHERE c.slug = 'development-boards'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'DHT22 Temperature & Humidity Sensor',
  'High-precision digital temperature and humidity sensor. Ideal for weather stations, environmental monitoring projects, and IoT applications.',
  499.00,
  c.id,
  100,
  ARRAY['https://source.unsplash.com/400x400/?temperature,sensor,electronics'],
  4.6,
  203,
  true
FROM categories c WHERE c.slug = 'sensors'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Ultrasonic Distance Sensor HC-SR04',
  'Accurate ultrasonic distance measurement sensor with 2cm to 400cm range. Perfect for robotics, automation projects, and obstacle detection systems.',
  199.00,
  c.id,
  80,
  ARRAY['https://source.unsplash.com/400x400/?ultrasonic,sensor,distance'],
  4.5,
  145,
  false
FROM categories c WHERE c.slug = 'sensors'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Robot Car Kit with Arduino',
  'Complete robot car kit with Arduino Uno, motor driver, ultrasonic sensor, Bluetooth module, and chassis. Perfect for beginners learning robotics and programming.',
  2499.00,
  c.id,
  25,
  ARRAY['https://source.unsplash.com/400x400/?robot,car,kit'],
  4.7,
  67,
  true
FROM categories c WHERE c.slug = 'robotics'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'ESP32 Development Board',
  'Powerful WiFi and Bluetooth enabled microcontroller board. Perfect for IoT projects with built-in wireless connectivity, dual-core processor, and low power consumption.',
  799.00,
  c.id,
  60,
  ARRAY['https://source.unsplash.com/400x400/?esp32,wifi,module'],
  4.8,
  234,
  true
FROM categories c WHERE c.slug = 'iot'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'OLED Display 0.96" 128x64 I2C',
  'High-contrast OLED display module with I2C interface. Perfect for displaying sensor data, project information, and status updates in your IoT or embedded projects.',
  349.00,
  c.id,
  90,
  ARRAY['https://source.unsplash.com/400x400/?oled,display,screen'],
  4.7,
  178,
  false
FROM categories c WHERE c.slug = 'modules'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'LED Assortment Kit - 200 pieces',
  'Assorted LEDs in various colors and sizes. Includes 3mm and 5mm LEDs in red, green, blue, yellow, and white. Essential for any electronics project.',
  599.00,
  c.id,
  40,
  ARRAY['https://source.unsplash.com/400x400/?led,lights,electronics'],
  4.4,
  92,
  false
FROM categories c WHERE c.slug = 'components'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Servo Motor MG996R',
  'High-torque metal gear servo motor with 10kg/cm torque at 4.8V. Perfect for robotics, RC models, and automation projects requiring precise movement control.',
  449.00,
  c.id,
  55,
  ARRAY['https://source.unsplash.com/400x400/?servo,motor,robotics'],
  4.6,
  112,
  false
FROM categories c WHERE c.slug = 'robotics'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Raspberry Pi Camera Module V2',
  '8 megapixel Sony IMX219 camera module for Raspberry Pi. Supports 1080p30, 720p60, and VGA90 video modes. Ideal for computer vision, surveillance, and robotics projects.',
  1299.00,
  c.id,
  30,
  ARRAY['https://source.unsplash.com/400x400/?raspberry,pi,camera'],
  4.7,
  89,
  true
FROM categories c WHERE c.slug = 'development-boards'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'NodeMCU ESP8266 WiFi Module',
  'Open-source IoT platform with ESP8266 WiFi SoC. Features integrated TCP/IP stack, GPIO pins, and Arduino compatibility. Perfect for IoT and home automation projects.',
  399.00,
  c.id,
  75,
  ARRAY['https://source.unsplash.com/400x400/?nodemcu,esp8266,wifi'],
  4.5,
  156,
  false
FROM categories c WHERE c.slug = 'iot'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, category_id, stock, images, rating, reviews, featured) 
SELECT 
  'Arduino Programming Guide',
  'Comprehensive guide to Arduino programming with practical projects and examples. Perfect for beginners and intermediate users wanting to master Arduino development.',
  899.00,
  c.id,
  20,
  ARRAY['https://source.unsplash.com/400x400/?arduino,programming,book'],
  4.8,
  45,
  false
FROM categories c WHERE c.slug = 'learning'
ON CONFLICT DO NOTHING;

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, min_order_amount, max_uses, expires_at) VALUES
('WELCOME10', 'percentage', 10.00, 1000.00, 100, NOW() + INTERVAL '30 days'),
('SAVE200', 'fixed', 200.00, 2000.00, 50, NOW() + INTERVAL '15 days'),
('STUDENT20', 'percentage', 20.00, 3000.00, 200, NOW() + INTERVAL '60 days')
ON CONFLICT (code) DO NOTHING;
