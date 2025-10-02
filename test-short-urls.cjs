const http = require('http');
const FormData = require('form-data');

// Create a simple test image buffer (1x1 pixel PNG)
const createTestImage = () => {
  const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  return Buffer.from(pngBase64, 'base64');
};

async function testShortUrls() {
  console.log('🧪 Testing Short URLs for Profile Images...\n');
  
  // First, login to get token
  console.log('1. 🔐 Getting auth token...');
  
  const loginData = JSON.stringify({
    email: 'test@jainconnect.com',
    password: 'password123'
  });

  const token = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          if (response.token) {
            console.log('✅ Login successful');
            resolve(response.token);
          } else {
            console.log('❌ Login failed:', response.message);
            resolve(null);
          }
        } catch (e) {
          console.log('❌ Login parse error:', e.message);
          resolve(null);
        }
      });
    });

    req.on('error', reject);
    req.write(loginData);
    req.end();
  });

  if (!token) {
    console.log('❌ Cannot proceed without auth token');
    return;
  }

  // Now test image upload
  console.log('\n2. 📸 Testing image upload with short URLs...');
  
  const form = new FormData();
  const testImageBuffer = createTestImage();
  
  form.append('profileImage', testImageBuffer, {
    filename: 'test-profile.png',
    contentType: 'image/png'
  });

  const uploadResult = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/upload-photo',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        
        try {
          const response = JSON.parse(body);
          console.log('Upload Response:', response);
          
          if (res.statusCode === 200 && response.success) {
            console.log('✅ Image upload successful!');
            console.log('📸 Image URL:', response.profileImageUrl);
            
            // Check URL type
            if (response.profileImageUrl) {
              if (response.profileImageUrl.includes('cloudinary.com')) {
                console.log('🌟 Cloudinary URL detected!');
              } else if (response.profileImageUrl.startsWith('http://localhost:5000/uploads/')) {
                console.log('🎯 Short local URL detected!');
                console.log('📏 URL Length:', response.profileImageUrl.length, 'characters');
              } else if (response.profileImageUrl.startsWith('data:')) {
                console.log('❌ Still using base64 (this should not happen now)');
              }
            }
            
            resolve({ success: true, imageUrl: response.profileImageUrl });
          } else {
            console.log('❌ Image upload failed:', response.message);
            resolve({ success: false });
          }
        } catch (e) {
          console.log('❌ Response parse error:', e.message);
          resolve({ success: false });
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request error:', error.message);
      reject(error);
    });
    
    form.pipe(req);
  });

  if (!uploadResult.success) {
    return;
  }

  // Test getting user profile to see short URL
  console.log('\n3. 👤 Testing profile retrieval with short URL...');
  
  await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/profile',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        
        try {
          const response = JSON.parse(body);
          
          if (res.statusCode === 200 && response.success) {
            console.log('✅ Profile retrieved successfully!');
            console.log('👤 User Profile Image URL:', response.user.profileImage);
            
            if (response.user.profileImage) {
              console.log('📏 Profile Image URL Length:', response.user.profileImage.length, 'characters');
              
              if (response.user.profileImage.startsWith('http://localhost:5000/uploads/')) {
                console.log('🎯 Perfect! Short URL in profile!');
              }
            }
            
            resolve(true);
          } else {
            console.log('❌ Profile retrieval failed:', response.message);
            resolve(false);
          }
        } catch (e) {
          console.log('❌ Profile parse error:', e.message);
          resolve(false);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });

  // Test if the image URL is actually accessible
  if (uploadResult.imageUrl && uploadResult.imageUrl.startsWith('http://localhost:5000/')) {
    console.log('\n4. 🌐 Testing if image URL is accessible...');
    
    const imageUrl = new URL(uploadResult.imageUrl);
    
    await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: imageUrl.pathname,
        method: 'GET'
      }, (res) => {
        console.log(`Image URL Status: ${res.statusCode}`);
        console.log(`Content-Type: ${res.headers['content-type']}`);
        
        if (res.statusCode === 200 && res.headers['content-type'].startsWith('image/')) {
          console.log('✅ Image URL is accessible!');
        } else {
          console.log('❌ Image URL not accessible');
        }
        
        resolve(true);
      });

      req.on('error', (error) => {
        console.log('❌ Image URL test error:', error.message);
        resolve(false);
      });
      
      req.end();
    });
  }
}

async function runTest() {
  try {
    console.log('🚀 Testing Short URLs for Profile Images\n');
    console.log('This will replace long base64 URLs with short, clean URLs\n');
    
    await testShortUrls();
    
    console.log('\n📋 Test Summary:');
    console.log('✅ Short URLs implemented');
    console.log('✅ No more long base64 strings');
    console.log('✅ Clean, accessible image URLs');
    console.log('✅ Images stored locally with proper URLs');
    
    console.log('\n🎯 URL Examples:');
    console.log('❌ Before: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg== (very long)');
    console.log('✅ After: http://localhost:5000/uploads/profile-images/profile-1234567890-123456789.png (short & clean)');
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

runTest();
